import TableWithCards from "./components/table-withCards";

export default function Materials() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="text-default-800 text-primary text-xl font-medium 2xl:text-2xl">
          Materiais
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-12">
          <TableWithCards />
        </div>
      </div>
    </div>
  );
}
