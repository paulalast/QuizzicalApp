import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
	base: "https://github.com/paulalast/QuizzicalApp.git",
	plugins: [react()],
})
// vite.config.js
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig(({ command }) => {
//   const config = {
//     plugins: [react()],
//     base: '/https://github.com/paulalast/QuizzicalApp.git',
//   }

//   if (command !== 'serve') {
//     config.base = '/https://github.com/paulalast/QuizzicalApp.git/'
//   }

//   return config
// })
