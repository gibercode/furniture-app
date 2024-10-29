import "@/app/globals.css";
import { CustomCard, CustomPagination, SearchInput } from "../components";
import type { InferGetServerSidePropsType } from "next";
import { ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSidePropsContext } from "next";

type DataType = {
  data: Array<Record<string, string | number>>;
  meta: Record<string, unknown>;
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const page = context.query.page || 1;
  const search = context.query.search || "";
  const res = await fetch(
    `https://dev2api.obriencrm.com/v1/Website/inmuebles?tk=${process.env.NEXT_PUBLIC_TOKEN}&page=${page}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tituloInmueble: search,
      }),
    }
  );
  const { data, meta }: DataType = await res.json();
  return { props: { data, page: Number(page), meta } };
};

const App = ({
  data,
  meta,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const router = useRouter();

  const handleNext = () => {
    if (page > Number(meta?.total)) return;
    router.push(`/?page=${page + 1}&search=${search}`);
    setPage((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (page === 1) return;
    router.push(`/?page=${page - 1}&search=${search}`);
    setPage((prev) => prev - 1);
  };

  const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event?.target?.value);
  };

  const submit = () => {
    router.push(`/?page=${page}&search=${search}`);
  };

  return (
    <>
      <Head>
        <title>{`Inmobiliaria test`}</title>
        <meta name="description" content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable." />
        <meta name="keywords" content="Inmueble, venta, renta, Inmobiliaria" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable." />
        <meta property="og:image" content="image" />
        <meta property="og:url" content={`https://site.com/`} />
      </Head>
      <div className="p-8 max-w-7xl mx-auto">
        <SearchInput handleInput={handleInput} submit={submit} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {data?.map((item: Record<string, string | number>) => {
            return <CustomCard key={item.slug} {...item} />;
          })}
        </div>

        {!data.length && (
          <div className="flex items-center justify-center h-32">
            <p>No se encontraron coincidencias con su búsqueda</p>
          </div>
        )}

        {!!data.length && (
          <CustomPagination
            handleNext={handleNext}
            handlePrevious={handlePrevious}
            page={page}
          />
        )}
      </div>
    </>
  );
};

export default App;
