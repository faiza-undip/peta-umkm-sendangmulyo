import QRCode from "qrcode";

export default async function QrCode({ value, size = 180 }: { value: string; size?: number }) {
  const dataUrl = await QRCode.toDataURL(value, {
    width: size,
    margin: 1,
    color: { dark: "#12181A", light: "#F4F1E6" },
  });

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={dataUrl} alt="QR Code menuju halaman UMKM ini" width={size} height={size} className="rounded-sm" />;
}
