import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { InertiaProgress } from '@inertiajs/progress';
import Layout from './Layouts/Layout';
import '../dist/compiled/css/app.css';
import '../dist/compiled/css/parsley.css';
import '../dist/compiled/css/app-dark.css';
import '../dist/compiled/css/iconly.css';
import "../dist//extensions/datatables.net-bs5/css/dataTables.bootstrap5.min.css"
import "../dist/compiled/css/table-datatable-jquery.css"
import "../dist/compiled/js/app.js"


const pages = import.meta.glob('./Pages/*.jsx')
console.log(pages);

document.addEventListener('DOMContentLoaded', () => {
  const theme = localStorage.getItem('theme')

    if (theme) 
        document.documentElement.setAttribute('data-bs-theme', theme)


  const appName = 'DjangoApp';

  InertiaProgress.init();

  createInertiaApp({
    title: (title) => `${title} | ${appName}`,
    resolve: async name => {
      const page = (await pages[`./Pages/${name}.jsx`]());
      return page
    },
    setup({ el, App, props }) {
      createRoot(el).render(<Layout><App {...props} /></Layout>)
    },
  })
});
