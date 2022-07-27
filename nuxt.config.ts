import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    modules: ["@unocss/nuxt", "@nuxtjs/color-mode", "@vueuse/nuxt"],
    experimental: {
        reactivityTransform: true,
        viteNode: false
    },
    unocss: {
        preflight: true
    },
    colorMode: {
        classSuffix: ""
    }
})
