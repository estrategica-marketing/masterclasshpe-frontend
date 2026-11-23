import { CANALES, PUESTOS } from "../../lib/formato";
import type { Usuario } from "../../lib/types";
import { AppFrame, PageTitle } from "../ui/AppFrame";
import { CambiarPassword } from "./CambiarPassword";

// Sólo lectura: los datos del participante los corrige el administrador desde el panel.
function MiInformacion({ usuario }: { usuario: Usuario }) {
   const datos: [string, string][] = [
      ["Nombre completo", usuario.nombre_completo ?? "—"],
      ["Correo", usuario.email],
      ["Empresa / Integrador", usuario.empresa ?? "—"],
      ["Puesto", usuario.puesto ? PUESTOS[usuario.puesto] : "—"],
      ["Canal de invitación", usuario.canal_invitacion ? CANALES[usuario.canal_invitacion] : "—"],
      ["Contacto / Distribuidor", usuario.contacto_referido ?? "—"],
      ["Teléfono", usuario.telefono ?? "—"],
      ["País", usuario.pais ?? "—"],
   ];
   return (
      <>
         <dl className="divide-y divide-line text-sm">
            {datos.map(([k, v]) => (
               <div key={k} className="grid gap-1 py-2.5 sm:grid-cols-[180px_1fr] sm:gap-3">
                  <dt className="text-muted">{k}</dt>
                  <dd className="break-words">{v}</dd>
               </div>
            ))}
         </dl>
         <p className="mt-4 text-xs text-muted">Para corregir algún dato contacta al administrador.</p>
      </>
   );
}

export default function CuentaApp() {
   return (
      <AppFrame rol="PARTICIPANTE" actual="/cuenta">
         {(usuario) => (
            <>
               <PageTitle titulo={`Hola, ${usuario.nombre_completo?.split(" ")[0] ?? ""}`} sub="Tu información de registro en la MasterClass." />
               <div className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
                  <section className="card h-fit p-6">
                     <h2 className="mb-4 text-lg font-medium">Mi información</h2>
                     <MiInformacion usuario={usuario} />
                  </section>
                  <section className="card h-fit p-6">
                     <h2 className="mb-4 text-lg font-medium">Seguridad</h2>
                     <CambiarPassword />
                  </section>
               </div>
            </>
         )}
      </AppFrame>
   );
}
