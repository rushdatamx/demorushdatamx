"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package, AlertCircle, AlertTriangle, CheckCircle } from "lucide-react";
import dashboardData from "../../../public/data/dashboard.json";

type StatusFilter = "all" | "ok" | "bajo" | "critico" | "agotado";

const statusConfig = {
  ok: {
    label: "OK",
    color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    icon: CheckCircle,
  },
  bajo: {
    label: "Bajo",
    color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    icon: AlertTriangle,
  },
  critico: {
    label: "Crítico",
    color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
    icon: AlertTriangle,
  },
  agotado: {
    label: "Agotado",
    color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    icon: AlertCircle,
  },
};

export default function InventarioPage() {
  const { inventario, kpis } = dashboardData;
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Calcular estadísticas
  const stats = useMemo(() => {
    const byStatus = {
      ok: inventario.filter((i) => i.estado === "ok").length,
      bajo: inventario.filter((i) => i.estado === "bajo").length,
      critico: inventario.filter((i) => i.estado === "critico").length,
      agotado: inventario.filter((i) => i.estado === "agotado").length,
    };
    return byStatus;
  }, [inventario]);

  // Filtrar datos
  const filteredData = useMemo(() => {
    return inventario.filter((item) => {
      const matchesStatus = statusFilter === "all" || item.estado === statusFilter;
      const matchesSearch =
        searchTerm === "" ||
        item.producto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tienda.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [inventario, statusFilter, searchTerm]);

  // Formatear nombre del producto
  const formatProductName = (fullName: string) => {
    const parts = fullName.split(" ");
    if (/^\d+$/.test(parts[0])) {
      return parts.slice(1).join(" ");
    }
    return fullName;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-foreground">Inventario</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Stock actual por tienda y producto · {inventario.length} registros
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card
          className={`cursor-pointer transition-all ${
            statusFilter === "ok" ? "ring-2 ring-green-500" : ""
          }`}
          onClick={() => setStatusFilter(statusFilter === "ok" ? "all" : "ok")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-600">{stats.ok}</p>
                <p className="text-xs text-muted-foreground">Stock OK</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            statusFilter === "bajo" ? "ring-2 ring-yellow-500" : ""
          }`}
          onClick={() => setStatusFilter(statusFilter === "bajo" ? "all" : "bajo")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-600">{stats.bajo}</p>
                <p className="text-xs text-muted-foreground">Stock Bajo</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            statusFilter === "critico" ? "ring-2 ring-orange-500" : ""
          }`}
          onClick={() => setStatusFilter(statusFilter === "critico" ? "all" : "critico")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold text-orange-600">{stats.critico}</p>
                <p className="text-xs text-muted-foreground">Crítico</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all ${
            statusFilter === "agotado" ? "ring-2 ring-red-500" : ""
          }`}
          onClick={() => setStatusFilter(statusFilter === "agotado" ? "all" : "agotado")}
        >
          <CardContent className="pt-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold text-red-600">{stats.agotado}</p>
                <p className="text-xs text-muted-foreground">Agotado</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por producto o tienda..."
          className="flex h-10 w-full sm:w-80 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            Todos
          </Button>
          {(["agotado", "critico", "bajo", "ok"] as const).map((status) => (
            <Button
              key={status}
              variant={statusFilter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setStatusFilter(status)}
            >
              {statusConfig[status].label}
            </Button>
          ))}
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tienda</TableHead>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Unidades</TableHead>
                  <TableHead className="text-right">Costo</TableHead>
                  <TableHead className="text-right">DOS</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.slice(0, 100).map((item, index) => {
                  const config = statusConfig[item.estado as keyof typeof statusConfig];
                  return (
                    <TableRow key={index}>
                      <TableCell className="font-medium text-sm">
                        {item.tienda}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatProductName(item.producto)}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {item.unidades.toLocaleString()}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        ${item.costo.toLocaleString("es-MX")}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {item.dos} días
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={config.color}>{config.label}</Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {filteredData.length > 100 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Mostrando 100 de {filteredData.length} registros
        </p>
      )}
    </div>
  );
}
