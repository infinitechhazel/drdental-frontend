export type Branch = {
    id: string
    name: string
    area: string
    phone: string
    email: string
    address: string
    hours: string
    mapQuery: string
    directionsUrl: string
    blurb: string
}

// Dr Dental Care Center — 7 branches across Davao Region
export const BRANCHES: Branch[] = [
    {
        id: "ponciano",
        name: "Ponciano",
        area: "Davao City",
        phone: "+63 967 964 6888",
        email: "ponciano@drdentalcareclinic.com",
        address: "Unit I-3 K.H Building, Ponciano cor. Bonifacio St, Davao City",
        hours: "Mon–Fri · 8AM–5PM",
        mapQuery: "Dr+Dental+Care+Center+-+Ponciano,+Davao+City",
        directionsUrl: "https://maps.app.goo.gl/BDzb3mLhe9TaGq3U7",
        blurb: "Our flagship clinic in the heart of downtown Davao.",
    },
    {
        id: "matina",
        name: "Matina",
        area: "Davao City",
        phone: "+63 967 964 6889",
        email: "matina@drdentalcareclinic.com",
        address: "2F MatinaTown Square, Matina, Davao City",
        hours: "Mon–Sat · 9AM–6PM",
        mapQuery: "Dr+Dental+Care+Center+-+Matina,+Davao+City",
        directionsUrl: "https://maps.google.com/?q=Matina+Davao+City",
        blurb: "Convenient mall-based branch with extended Saturday hours.",
    },
    {
        id: "bajada",
        name: "Bajada",
        area: "Davao City",
        phone: "+63 967 964 6890",
        email: "bajada@drdentalcareclinic.com",
        address: "J.P. Laurel Ave, Bajada, Davao City",
        hours: "Mon–Fri · 8AM–5PM",
        mapQuery: "Dr+Dental+Care+Center+-+Bajada,+Davao+City",
        directionsUrl: "https://maps.google.com/?q=Bajada+Davao+City",
        blurb: "Easy-access clinic along the main avenue.",
    },
    {
        id: "toril",
        name: "Toril",
        area: "Davao City",
        phone: "+63 967 964 6891",
        email: "toril@drdentalcareclinic.com",
        address: "National Highway, Toril, Davao City",
        hours: "Mon–Sat · 9AM–5PM",
        mapQuery: "Dr+Dental+Care+Center+-+Toril,+Davao+City",
        directionsUrl: "https://maps.google.com/?q=Toril+Davao+City",
        blurb: "Serving the southern district with weekend availability.",
    },
    {
        id: "digos",
        name: "Digos",
        area: "Davao del Sur",
        phone: "+63 967 964 6892",
        email: "digos@drdentalcareclinic.com",
        address: "Rizal Ave, Digos City, Davao del Sur",
        hours: "Mon–Fri · 8AM–5PM",
        mapQuery: "Dr+Dental+Care+Center+-+Digos+City",
        directionsUrl: "https://maps.google.com/?q=Digos+City",
        blurb: "Our provincial branch serving Davao del Sur.",
    },
    {
        id: "tagum",
        name: "Tagum",
        area: "Davao del Norte",
        phone: "+63 967 964 6893",
        email: "tagum@drdentalcareclinic.com",
        address: "Pioneer Ave, Tagum City, Davao del Norte",
        hours: "Mon–Sat · 9AM–6PM",
        mapQuery: "Dr+Dental+Care+Center+-+Tagum+City",
        directionsUrl: "https://maps.google.com/?q=Tagum+City",
        blurb: "Full-service clinic in the Davao del Norte capital.",
    },
    {
        id: "panabo",
        name: "Panabo",
        area: "Davao del Norte",
        phone: "+63 967 964 6894",
        email: "panabo@drdentalcareclinic.com",
        address: "National Highway, Panabo City, Davao del Norte",
        hours: "Mon–Fri · 8AM–5PM",
        mapQuery: "Dr+Dental+Care+Center+-+Panabo+City",
        directionsUrl: "https://maps.google.com/?q=Panabo+City",
        blurb: "Our newest branch, serving Panabo and nearby towns.",
    },
]

export function getBranchById(id: string): Branch | undefined {
    return BRANCHES.find((b) => b.id === id)
}