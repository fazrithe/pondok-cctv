import { Video, ArrowLeft } from "lucide-react";
import Container from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center bg-white py-20">
      <Container className="text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900">
          <Video size={28} className="text-white" />
        </span>
        <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-slate-900">404</h1>
        <p className="mt-3 text-lg font-semibold text-slate-700">Halaman Tidak Ditemukan</p>
        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
          Maaf, kamera kami tidak dapat mendeteksi halaman yang Anda cari. Sepertinya halaman ini
          sudah dipindahkan atau tidak tersedia.
        </p>
        <div className="mt-8 flex justify-center">
          <ButtonLink href="/">
            <ArrowLeft size={16} /> Kembali ke Beranda
          </ButtonLink>
        </div>
      </Container>
    </div>
  );
}
