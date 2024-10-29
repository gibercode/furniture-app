import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/router";

export const CustomCard = ({
  imagenPortada,
  tituloInmueble,
  provincia,
  municipio,
  localidad,
  precioVenta,
  precioRenta,
  nroHabitaciones,
  nroBanios,
  nombreAgente,
  telefonoAgente,
  correoAgente,
  idInmueble,
}: Record<string, string | number>) => {
  const router = useRouter();
  const handleDetail = (id: string) => {
    router.push(`/${id}`);
  };
  return (
    <Card onClick={() => handleDetail(idInmueble.toString())} className="cursor-pointer">
      <div className="relative w-full h-32 ">
        <Image
          src={imagenPortada.toString()}
          alt="portrait image"
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl"
        ></Image>
      </div>

      <CardHeader>
        <CardTitle>{tituloInmueble}</CardTitle>
        <CardDescription>
          {provincia} {municipio} {localidad}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="text-[14px]">
          <li>Baños: {nroBanios}</li>
          <li>Habitaciones: {nroHabitaciones}</li>
          <li>Precio de Venta: {precioVenta}</li>
          <li>Precio de Renta: {precioRenta}</li>
        </ul>
      </CardContent>
      <Separator className="mb-3" />
      <CardFooter>
        <ul className="text-[14px]">
          <li>
            Agente {nombreAgente} {telefonoAgente}
          </li>
          <li>Correo: {correoAgente}</li>
        </ul>
      </CardFooter>
    </Card>
  );
};
