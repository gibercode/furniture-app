import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Head from "next/head";
import "../../app/globals.css";

export async function getServerSideProps(context: any) {
  const { id } = context.params;
  const res = await fetch(
    `https://dev2api.obriencrm.com/v1/Website/inmueble/${id}?tk=${process.env.NEXT_PUBLIC_TOKEN}`
  );
  const { data } = await res.json();
  if (!res.ok) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      detail: data,
    },
  };
}

const Detail = ({ detail }: any) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <Head>
        <title>{`${detail?.[0]?.tituloInmueble}`}</title>
        <meta name="description" content={detail?.[0]?.descripcionSEO} />
        <meta name="keywords" content="inmueble, venta, renta" />
        <meta property="og:title" content={`${detail?.[0]?.tituloInmueble}`} />
        <meta property="og:description" content={detail?.[0]?.descripcionSEO} />
        <meta property="og:image" content={detail?.[0]?.imagenesGaleria?.[0]} />
        <meta property="og:url" content={`https://site.com/${id}`} />
      </Head>
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden mt-8">
        <div className="h-64 w-full relative">
          <img
            src={detail?.[0]?.imagenesGaleria?.[0]}
            alt="portada"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            {detail?.[0]?.tituloInmueble}
          </h1>
          <p className="text-gray-600 mb-2">{detail?.[0]?.descripcionSEO}</p>
          <p className="text-gray-400 mb-4">
            {detail?.[0]?.provincia} {detail?.[0]?.municipio}{" "}
            {detail?.[0]?.localidad}{" "}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm text-gray-600">
              <strong>Precio venta:</strong> {detail?.[0].precioVenta}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Precio renta:</strong> ${detail?.[0].precioRenta}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm text-gray-600">
              <strong>Habitaciones:</strong> {detail?.[0]?.nroHabitaciones}
            </div>
            <div className="text-sm text-gray-600">
              <strong>Baños</strong> ${detail?.[0]?.nroBanios}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="text-sm text-gray-600">
              <strong>Estacionamientos:</strong>{" "}
              {detail?.[0]?.nroEstacionamientos}
            </div>
          </div>

          <Separator className="mt-3 mb-3" />

          <p className="text-sm">{detail?.[0]?.nombreAgente}</p>
          <p className="text-sm">{detail?.[0]?.telefonoAgente}</p>
          <p className="text-sm">{detail?.[0]?.correoAgente}</p>

          <div className="mt-6">
            <Button onClick={() => router.back()}>Volver</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
