import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'
import ComponentPlayground from './components/ComponentPlayground.vue'
import PropsTable from './components/PropsTable.vue'
import InstallCommand from './components/InstallCommand.vue'

const theme: Theme = {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ComponentPlayground', ComponentPlayground)
    app.component('PropsTable', PropsTable)
    app.component('InstallCommand', InstallCommand)
  },
}

export default theme
