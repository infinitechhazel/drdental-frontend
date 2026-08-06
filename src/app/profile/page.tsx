"use client"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Stethoscope,
  Pin,
} from "lucide-react"
import Header from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"

const fade = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
}

type Booking = {
  id: string
  user_id?: string
  service_id?: string
  service?: { id: string; name: string } | null
  booking_date: string
  branch: string | null
  status: "pending" | "confirmed" | "cancelled"
  notes?: string | null
  name: string
  email: string
  phone?: string | null
}

const statusColors: Record<string, string> = {
  pending: "border-yellow-300 bg-yellow-50 text-yellow-700",
  confirmed: "border-emerald-300 bg-emerald-50 text-emerald-700",
  cancelled: "border-red-300 bg-red-50 text-red-700",
}

function parseDate(booking: Booking): string {
  const raw = booking.booking_date || ""
  if (!raw) return "—"
  const datePart = raw.split(/[ T]/)[0]
  const d = new Date(datePart + "T00:00:00")
  if (isNaN(d.getTime())) return raw
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

function parseTime(booking: Booking): string {
  const raw = booking.booking_date || ""
  const parts = raw.split(/[ T]/)
  const timePart = parts[1] ?? ""
  if (!timePart) return "—"

  const [h, m] = timePart.split(":").map(Number)
  if (isNaN(h) || isNaN(m)) return "—"
  const suffix = h >= 12 ? "PM" : "AM"
  const hour = h % 12 || 12
  return `${hour}:${String(m).padStart(2, "0")} ${suffix}`
}

function parseService(booking: Booking): string {
  return booking.service?.name || "Appointment"
}

export default function ProfilePage() {
  const router = useRouter()
  const { isLoggedIn, user, token } = useAuthStore()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!isLoggedIn || !token) {
      router.replace("/login?redirect=/profile")
    }
  }, [isLoggedIn, token, router])

  useEffect(() => {
    if (!token) return
    async function fetchBookings() {
      try {
        const res = await fetch("/api/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (!res.ok) throw new Error(data.message || "Failed to load bookings.")
        const list = data.bookings ?? data.data ?? data ?? []
        setBookings(Array.isArray(list) ? list : [])
      } catch (err: unknown) {
        // FIX: Use `unknown` instead of `any` and narrow with instanceof before
        // accessing `.message`, which is the correct TS-safe pattern for caught errors.
        setError(
          err instanceof Error ? err.message : "Could not load your bookings.",
        )
      } finally {
        setLoading(false)
      }
    }
    fetchBookings()
  }, [token])

  if (!isLoggedIn || !token) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-green-200 flex flex-col">
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 pt-28 pb-20">
        <motion.div {...fade} className="mb-10">
          <p className="text-emerald-700 text-sm uppercase tracking-[0.3em] mb-3">
            Account
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-emerald-950">
            My Profile
          </h1>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Profile card */}
          <motion.div
            {...fade}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card className="p-6 bg-white/80 border-green-200 backdrop-blur-sm shadow-sm">
              <div className="w-16 h-16 rounded-full bg-emerald-600 border border-emerald-300 flex items-center justify-center text-white text-2xl font-serif mb-5">
                {typeof user?.name === "string"
                  ? user.name.charAt(0).toUpperCase()
                  : "U"}
              </div>
              <h2 className="text-emerald-950 text-xl font-medium mb-1">
                {typeof user?.name === "string" ? user.name : ""}
              </h2>
              <p className="text-emerald-700 text-sm mb-6">Patient Account</p>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-emerald-800">
                  <User size={14} className="text-emerald-600 shrink-0" />
                  <span className="truncate">
                    {typeof user?.name === "string" ? user.name : ""}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-emerald-800">
                  <Mail size={14} className="text-emerald-600 shrink-0" />
                  <span className="truncate">
                    {typeof user?.email === "string" ? user.email : ""}
                  </span>
                </div>
                {typeof user?.phone === "string" && user.phone && (
                  <div className="flex items-center gap-3 text-emerald-800">
                    <Phone size={14} className="text-emerald-600 shrink-0" />
                    <span>{user.phone}</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Bookings */}
          <motion.div
            {...fade}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-4"
          >
            <h3 className="text-emerald-950 font-medium text-lg mb-4 flex items-center gap-2">
              <Stethoscope size={16} className="text-emerald-600" />
              My Appointments
            </h3>

            {loading && (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-24 rounded-xl bg-white/5 animate-pulse"
                  />
                ))}
              </div>
            )}

            {error && (
              <div className="text-red-700 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                {error}
              </div>
            )}

            {!loading && !error && bookings.length === 0 && (
              <Card className="p-10 bg-white/80 border-green-200 text-center shadow-sm">
                <Calendar size={32} className="text-emerald-600 mx-auto mb-3" />
                <p className="text-slate-500 text-sm">No appointments yet.</p>
                <button
                  onClick={() => router.push("/book")}
                  className="mt-4 px-5 py-2 bg-emerald-600 text-white text-sm font-medium rounded-full hover:bg-emerald-700 transition-colors"
                >
                  Book Now
                </button>
              </Card>
            )}

            {!loading &&
              bookings.map((b, i) => (
                <motion.div
                  key={b.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                >
                  <Card className="p-5 bg-white/85 border-green-200 hover:bg-green-50 transition-colors shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5">
                        <p className="text-emerald-950 font-medium">
                          {parseService(b)}
                        </p>
                        <div className="flex flex-wrap items-center gap-3 text-emerald-800 text-xs">
                          <span className="flex items-center gap-1">
                            <Calendar size={11} className="text-emerald-600" />
                            {parseDate(b)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock size={11} className="text-emerald-600" />
                            {parseTime(b)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Pin size={11} className="text-emerald-600" />
                            {b.branch}
                          </span>
                        </div>
                        {b.notes && (
                          <p className="text-emerald-600 text-xs line-clamp-2 max-w-md">
                            {b.notes}
                          </p>
                        )}
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <Badge
                          variant="outline"
                          className={`capitalize text-xs ${statusColors[b.status] ?? "border-white/20 text-emerald-800"}`}
                        >
                          {b.status ?? "unknown"}
                        </Badge>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </main>
    </div>
  )
}
