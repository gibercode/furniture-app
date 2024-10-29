import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const SearchInput = ({
  handleInput,
  submit,
}: {
  handleInput: (event: any) => void;
  submit: () => void;
}) => {
  return (
    <div className="flex w-full items-center space-x-2 max-w-screen-xl mb-10">
      <Input
        type="titulo"
        placeholder="Titulo"
        className="h-12"
        onChange={handleInput}
      />
      <Button type="submit" className="h-12" onClick={submit}>
        Buscar
      </Button>
    </div>
  );
};
