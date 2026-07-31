"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Navigation,
} from "lucide-react"
import { motion } from "framer-motion"

const fade = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
}

const inputClass =
  "bg-white/10 border-blue-500/30 text-white placeholder:text-slate-400 focus:border-cyan-400 focus-visible:ring-0 focus-visible:ring-offset-0"

// Dr Dental Care Center - Ponciano, Davao City
const MAP_QUERY = "Dr+Dental+Care+Center+-+Ponciano,+Davao+City"
const MAP_EMBED_SRC = `https://www.google.com/maps?q=${MAP_QUERY}&z=17&output=embed`
const MAP_DIRECTIONS_URL = "https://maps.app.goo.gl/BDzb3mLhe9TaGq3U7"

export default function ContactPage() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const info = [
    { icon: Phone, label: "Phone", value: "+63 967 964 6888" },
    { icon: Mail, label: "Email", value: "info@drdentalcareclinic.com" },
    {
      icon: MapPin,
      label: "Address",
      value: "Unit I-3 K.H Building, Ponciano cor. Bonifacio St, Davao City",
    },
    { icon: Clock, label: "Hours", value: "Mon–Fri · 8AM–5PM" },
  ]

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    const data = {
      name: form.get("name"),
      email: form.get("email"),
      subject: form.get("subject"),
      message: form.get("message"),
    }

    try {
      await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setSent(true)
    } catch (err: unknown) {
      console.error(err)
      alert("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      {/* HERO */}
      <section className="relative pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-[#050816] to-cyan-900/10" />
        <div className="absolute top-20 left-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-600/10 blur-[100px] sm:blur-[140px] rounded-full -translate-x-1/2" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div {...fade}>
            <p className="text-cyan-400 text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] mb-3 sm:mb-4 font-mono">
              Contact
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            <p className="text-slate-400 mt-4 max-w-xl mx-auto text-sm sm:text-base px-2">
              Premium care starts with a conversation. Let&apos;s build your
              journey together.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="pt-6 pb-16 sm:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8 lg:space-y-10">
          {/* FORM + INFO STRIP */}
          <div className="grid lg:grid-cols-[1.3fr_1fr] gap-8 lg:gap-10">
            {/* FORM */}
            <motion.div {...fade}>
              <Card className="h-full p-5 sm:p-8 bg-white/5 border border-blue-500/20 backdrop-blur-xl shadow-[0_0_40px_rgba(0,100,255,0.08)] rounded-2xl">
                {sent ? (
                  <div className="h-full flex flex-col items-center justify-center text-center py-12">
                    <CheckCircle
                      className="text-cyan-400 mx-auto mb-4"
                      size={42}
                    />
                    <h3 className="text-2xl font-semibold">Message Sent</h3>
                    <p className="text-slate-400 mt-2">
                      We&apos;ll respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4 sm:mb-6">
                      Send a Message
                    </h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-slate-300">Name</Label>
                        <Input
                          name="name"
                          required
                          placeholder="Juan dela Cruz"
                          className={inputClass}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-slate-300">Email</Label>
                        <Input
                          name="email"
                          type="email"
                          required
                          placeholder="juan@email.com"
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300">Subject</Label>
                      <Input
                        name="subject"
                        required
                        placeholder="Appointment inquiry"
                        className={inputClass}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label className="text-slate-300">Message</Label>
                      <Textarea
                        name="message"
                        rows={5}
                        required
                        placeholder="Write your message here..."
                        className={inputClass}
                      />
                    </div>

                    <Button
                      disabled={loading}
                      className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white shadow-lg shadow-blue-500/20"
                    >
                      {loading ? "Sending..." : "Send Message"}
                      <Send size={16} className="ml-2" />
                    </Button>
                  </form>
                )}
              </Card>
            </motion.div>

            {/* INFO — "patient chart" readout, the signature element */}
            <motion.div {...fade} transition={{ delay: 0.15 }}>
              <Card className="h-full p-5 sm:p-6 bg-white/5 border border-blue-500/20 backdrop-blur-xl rounded-2xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-5 sm:mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-mono">
                    Clinic Details
                  </p>
                </div>

                <dl className="divide-y divide-blue-500/15">
                  {info.map((item, i) => (
                    <div
                      key={i}
                      className="flex gap-4 py-3.5 sm:py-4 first:pt-0 last:pb-0"
                    >
                      <item.icon
                        size={18}
                        className="text-cyan-400 shrink-0 mt-0.5"
                      />
                      <div className="min-w-0">
                        <dt className="text-[11px] uppercase tracking-wider text-slate-500 font-mono">
                          {item.label}
                        </dt>
                        <dd className="text-sm sm:text-[15px] text-slate-200 font-mono break-words mt-0.5">
                          {item.value}
                        </dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </Card>
            </motion.div>
          </div>

          {/* MAP — full width, scanner-framed like a chairside x-ray viewer */}
          <motion.div {...fade} transition={{ delay: 0.1 }}>
            <Card className="relative overflow-hidden bg-white/5 border border-blue-500/20 backdrop-blur-xl rounded-2xl">
              {/* corner brackets */}
              <div className="pointer-events-none absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-md z-10" />
              <div className="pointer-events-none absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-cyan-400/60 rounded-tr-md z-10" />
              <div className="pointer-events-none absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-cyan-400/60 rounded-bl-md z-10" />
              <div className="pointer-events-none absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-cyan-400/60 rounded-br-md z-10" />

              <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-blue-500/15">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-mono">
                  Find Us
                </p>
                <a
                  href={MAP_DIRECTIONS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-cyan-400 hover:text-cyan-300 transition"
                >
                  <Navigation size={14} />
                  Get Directions
                </a>
              </div>

              <div className="relative w-full aspect-[16/9] sm:aspect-[21/9]">
                <iframe
                  src={MAP_EMBED_SRC}
                  title="Dr Dental Care Center - Ponciano location map"
                  className="absolute inset-0 w-full h-full border-0 grayscale-[15%] contrast-[1.05]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
