"use client"

import { useEffect } from "react"
import DataService from "@/lib/data-service"

export function useDataInit() {
  useEffect(() => {
    // Inicializar dados padrão quando a aplicação arranca
    DataService.initializeDefaultData()
  }, [])
}
