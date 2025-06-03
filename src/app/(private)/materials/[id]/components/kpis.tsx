export function Kpis() {
  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <div className="flex w-full items-center justify-between">
        <span className="text-primary text-2xl font-semibold">
          Indicadores do Material
        </span>
      </div>
      <div className="flex w-full flex-col items-center justify-evenly gap-4 xl:flex-row">
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-1.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            CONSUMO MÉDIO DO MATERIAL
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">47</span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-2.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            OS COM ESTE MATERIAL
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">100</span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-3.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            CUSTO TOTAL DO MATERIAL
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            R$12.345,67
          </span>
        </div>
        <div className="flex h-40 w-full flex-col items-center justify-center gap-2 overflow-hidden rounded-md bg-[url('/static/materials-4.png')] bg-cover bg-center bg-no-repeat xl:h-60 xl:w-1/5 xl:gap-4">
          <span className="bg-primary p-1 text-center text-xs font-semibold text-white xl:text-base">
            EQUIPAMENTOS QUE UTILIZAM ESTE MATERIAL
          </span>
          <span className="text-2xl font-bold text-white xl:text-3xl">
            234 Eqp.
          </span>
        </div>
      </div>
    </div>
  );
}
