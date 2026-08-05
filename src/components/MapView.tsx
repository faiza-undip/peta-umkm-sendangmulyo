"use client";

import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import Link from "next/link";
import type { Umkm } from "@prisma/client";
import { businessTypeColor, businessTypeLabel } from "@/lib/labels";

// Titik tengah default: sekitar Bundaran Tulus Harapan, RW 09 Sendangmulyo.
const DEFAULT_CENTER: [number, number] = [-7.0356, 110.4463];

export default function MapView({ items }: { items: Umkm[] }) {
  const pins = useMemo(
    () =>
      items.filter(
        (u) => u.latitude !== null && u.longitude !== null,
      ) as (Umkm & { latitude: NonNullable<Umkm["latitude"]>; longitude: NonNullable<Umkm["longitude"]> })[],
    [items],
  );

  const center: [number, number] =
    pins.length > 0 ? [Number(pins[0].latitude), Number(pins[0].longitude)] : DEFAULT_CENTER;

  return (
    <MapContainer
      center={center}
      zoom={16}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {pins.map((u) => (
        <CircleMarker
          key={u.id}
          center={[Number(u.latitude), Number(u.longitude)]}
          radius={9}
          pathOptions={{
            color: businessTypeColor[u.businessType],
            fillColor: businessTypeColor[u.businessType],
            fillOpacity: 0.85,
            weight: 2,
          }}
        >
          <Popup>
            <p className="font-avenir text-sm font-800 text-paper">{u.businessName}</p>
            <p className="mt-0.5 text-xs text-paper/70">{businessTypeLabel[u.businessType]}</p>
            <p className="mt-1 text-xs text-paper/50">RT {u.rt}/RW {u.rw}</p>
            <Link
              href={`/direktori/${u.slug}`}
              className="mt-2 inline-block text-xs font-medium text-gold underline"
            >
              Lihat detail →
            </Link>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
}
