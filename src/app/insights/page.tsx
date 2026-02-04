"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  TrendingUp,
  AlertTriangle,
  Star,
  Package,
  Calendar,
  Sparkles,
  CheckCircle,
  ArrowRight,
  FileText,
} from "lucide-react";
import dashboardData from "../../../public/data/dashboard.json";

const sectionIcons = {
  "OPORTUNIDAD DE CRECIMIENTO": TrendingUp,
  "PROBLEMA DE ABASTO": AlertTriangle,
  "PRODUCTOS ESTRELLA": Star,
  "ALERTA DE INVENTARIO": Package,
};

const sectionColors = {
  "OPORTUNIDAD DE CRECIMIENTO": {
    bg: "bg-green-50 dark:bg-green-950",
    border: "border-green-200 dark:border-green-800",
    icon: "text-green-600",
    badge: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  },
  "PROBLEMA DE ABASTO": {
    bg: "bg-red-50 dark:bg-red-950",
    border: "border-red-200 dark:border-red-800",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  },
  "PRODUCTOS ESTRELLA": {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    border: "border-yellow-200 dark:border-yellow-800",
    icon: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  },
  "ALERTA DE INVENTARIO": {
    bg: "bg-orange-50 dark:bg-orange-950",
    border: "border-orange-200 dark:border-orange-800",
    icon: "text-orange-600",
    badge: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
  },
};

export default function InsightsPage() {
  const { briefing, kpis } = dashboardData;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="h-5 w-5 text-purple-500" />
          <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            Generado por IA
          </Badge>
        </div>
        <h1 className="text-2xl font-semibold text-foreground">
          {briefing.titulo}
        </h1>
        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {briefing.fecha_generacion}
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Período: {briefing.periodo_analisis}
          </span>
        </div>
      </div>

      {/* Executive Summary */}
      <Card className="mb-8 border-purple-200 bg-purple-50 dark:border-purple-800 dark:bg-purple-950">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-purple-600" />
            Resumen Ejecutivo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm leading-relaxed text-foreground">
            {briefing.resumen_ejecutivo}
          </p>
        </CardContent>
      </Card>

      {/* Sections */}
      <div className="space-y-6">
        {briefing.secciones.map((seccion, index) => {
          const Icon =
            sectionIcons[seccion.titulo as keyof typeof sectionIcons] || Package;
          const colors =
            sectionColors[seccion.titulo as keyof typeof sectionColors] || {
              bg: "bg-gray-50",
              border: "border-gray-200",
              icon: "text-gray-600",
              badge: "bg-gray-100 text-gray-800",
            };

          return (
            <Card key={index} className={`${colors.bg} ${colors.border} border`}>
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${colors.icon}`} />
                  {seccion.titulo}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {seccion.puntos.map((punto, pIndex) => (
                    <li key={pIndex} className="flex items-start gap-3">
                      <ArrowRight className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <span className="text-sm leading-relaxed">{punto}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Items */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            Acciones Sugeridas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="h-6 w-6 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-red-600">1</span>
              </div>
              <div>
                <p className="font-medium text-sm">Urgente: Resolver quiebres de stock</p>
                <p className="text-xs text-muted-foreground mt-1">
                  {kpis.tiendas_con_quiebre} tiendas afectadas con {kpis.productos_con_quiebre} productos agotados
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-orange-600">2</span>
              </div>
              <div>
                <p className="font-medium text-sm">Importante: Solicitar aumento de pedido mínimo</p>
                <p className="text-xs text-muted-foreground mt-1">
                  DOS promedio de {kpis.dos_promedio} días indica necesidad de más frecuencia de entrega
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <span className="text-xs font-bold text-green-600">3</span>
              </div>
              <div>
                <p className="font-medium text-sm">Oportunidad: Impulsar productos estrella</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Promoción cruzada y mayor exhibición en tiendas de alto tráfico
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Note */}
      <div className="mt-8 p-4 bg-muted/30 rounded-lg border border-dashed">
        <p className="text-xs text-muted-foreground text-center">
          Este briefing fue generado automáticamente analizando datos de {kpis.total_tiendas} tiendas
          y {kpis.total_productos} productos. Última actualización: {kpis.fecha_actualizacion}
        </p>
      </div>
    </div>
  );
}
