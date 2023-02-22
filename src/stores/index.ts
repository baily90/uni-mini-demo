import { createPinia } from 'pinia'
import piniaPluginPersiststate from 'pinia-plugin-persistedstate'

const store = createPinia()
store.use(piniaPluginPersiststate)

export default store