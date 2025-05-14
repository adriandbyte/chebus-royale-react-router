import { Separator } from "@radix-ui/react-separator";
import { Tabs, TabsContent } from "@radix-ui/react-tabs";

import RuleCard from "~/components/rule-card";
import ScoreCard from "~/components/score-card";
import { Card, CardFooter, CardHeader, CardTitle } from "~/components/ui/card";

export default function Home() {
  return (
    <div className="flex items-center justify-center  bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <Card className="w-full max-w-4xl border-0 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-900 text-white rounded-t-lg p-6">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-pattern-grid"></div>
          </div>
          <div className="text-center space-y-1 relative z-10">
            <CardTitle className="text-2xl sm:text-4xl font-bold tracking-tight">
              CHEBUS ROYALE
            </CardTitle>
          </div>
        </CardHeader>

        <Tabs defaultValue="reglas" className="w-full">
          <TabsContent value="reglas" className="mt-0">
            <div className="space-y-4 p-4">
              <CardTitle className="text-center text-xl text-blue-900 font-bold pb-2">
                REGLAMENTO OFICIAL
              </CardTitle>
              <Separator className="bg-blue-200" />

              <RuleCard
                number="01"
                title="Inscripción y Pago"
                content="Los jugadores deberán pagar el total del torneo para que pueda ser llevado a cabo. El torneo no será iniciado sin que todos los jugadores confirmen su pago. Después de esta confirmación, deberán mandar mensaje al administrador para efectuar el pago en la plataforma."
              />

              <RuleCard
                number="02"
                title="Formato del Torneo"
                content="Será una liga de 2 vueltas y cada jugador deberá terminarla en un periodo no mayor a 2 semanas (dependiendo de los participantes)."
              />

              <RuleCard
                number="03"
                title="Registro de Mazos"
                content="Los jugadores deberán llenar sus mazos en la sección del perfil y confirmar los mazos que usarán. Una vez confirmado, el mazo no podrá ser modificado o cambiado sin la aprobación del administrador del torneo. Para la primera vuelta, los jugadores podrán modificar los mazos como prefieran sin repetir cartas."
              />

              <RuleCard
                number="04"
                title="Ronda Final y Brackets"
                content="En la ronda final en los brackets, los primeros jugadores podrán banear una carta de los jugadores abajo del top antes de que registren los mazos, para así armar los mazos con esta limitante."
              />

              <RuleCard
                number="05"
                title="Penalizaciones por Inactividad"
                content="Jugador que después de la primer semana no participe o no conteste será reportado con un marcador negativo de 1-2, siempre y cuando el otro jugador esté presente o haya evidencia de que lo estuvo buscando."
              />
            </div>
          </TabsContent>

          <TabsContent value="puntuacion" className="mt-0">
            <div className="p-6 space-y-2">
              <CardTitle className="text-lg text-blue-900 mb-4">
                Sistema de Puntuación
              </CardTitle>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ScoreCard
                  title="Victoria 2-0"
                  points="3"
                  color="bg-green-500"
                />
                <ScoreCard
                  title="Victoria 2-1"
                  points="2"
                  color="bg-blue-500"
                />
                <ScoreCard title="Derrota" points="0" color="bg-red-500" />
              </div>

              <div className="mt-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
                <p className="text-blue-800">
                  Cada triunfo contará con puntos y habrá una tabla general que
                  el jugador podrá visualizar en la sección de torneos.
                </p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="calendario" className="mt-0">
            <div className="h-96 flex items-center justify-center">
              <div className="text-center text-blue-800 p-6">
                <p className="text-xl font-medium">
                  El calendario del torneo será publicado próximamente
                </p>
                <p className="text-sm mt-2 text-blue-600">
                  Una vez que todos los participantes confirmen su inscripción
                </p>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <CardFooter className="bg-gradient-to-r from-blue-500 to-blue-700 rounded-b-lg p-6">
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white text-sm">
              Para cualquier duda, contactar al administrador del torneo.
            </p>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
