import './App.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import Browse from './components/Browse'
const AdminProjectDetails = lazy(() =>
  import('./components/Admin/AdminProjectDetails')
)
const AdminSalaryDetails = lazy(() =>
  import('./components/Admin/AdminSalaryDetails')
)
const AdminAddProject = lazy(() => import('./components/Admin/AdminAddProject'))
const Trainings = lazy(() => import('./components/footer/Trainings'))
const AdminAddSalary = lazy(() => import('./components/Admin/AdminAddSalary'))
const AdminEmployees = lazy(() => import('./components/Admin/AdminEmployees'))
const AdminBrowse = lazy(() => import('./components/Admin/AdminBrowse'))
const LeaveReport = lazy(() => import('./components/Employee/LeaveReport'))
const ProjectReport = lazy(() => import('./components/Employee/ProjectReport'))
const ProjectDetails = lazy(() =>
  import('./components/Employee/ProjectDetails')
)
const SalaryDetails = lazy(() => import('./components/Employee/SalaryDetails'))
const EmployeeHome = lazy(() => import('./components/Employee/EmployeeHome'))
const EmployeeLogin = lazy(() => import('./components/Employee/EmployeeLogin'))
const AdminLogin = lazy(() => import('./components/Admin/AdminLogin'))
const FAQ = lazy(() => import('./components/footer/FAQ'))
const Benefits = lazy(() => import('./components/footer/Benefits'))
const Policies = lazy(() => import('./components/footer/Policies'))
const ContactUs = lazy(() => import('./components/footer/ContactUs'))
const Careers = lazy(() => import('./components/footer/Careers'))
const AboutUs = lazy(() => import('./components/footer/AboutUs'))
const AdminEditProject = lazy(() =>
  import('./components/Admin/AdminEditProject')
)
const AdminAddEmployee = lazy(() =>
  import('./components/Admin/AdminAddEmployee')
)
const AdminLeaveReport = lazy(() =>
  import('./components/Admin/AdminLeaveReport')
)
const AdminProjectReport = lazy(() =>
  import('./components/Admin/AdminProjectReport')
)

const Applayout = () => {
  return (
    <div>
      <Browse />
      <Outlet />
    </div>
  )
}

const appRouter = createBrowserRouter([
  {
    path: '/',
    Element: <Applayout />,
    children: [
      {
        path: '/',
        element: (
          <Suspense>
            <Browse />
          </Suspense>
        ),
      },
      {
        path: '/Adminlogin/',
        element: (
          <Suspense>
            <AdminLogin />
          </Suspense>
        ),
      },
      {
        path: '/employeeLogin/',
        element: (
          <Suspense>
            <EmployeeLogin />
          </Suspense>
        ),
      },
      {
        path: '/admin/',
        element: (
          <Suspense>
            <AdminBrowse />
          </Suspense>
        ),
      },
      {
        path: '/admin/employees',
        element: (
          <Suspense>
            <AdminEmployees />
          </Suspense>
        ),
      },
      {
        path: '/admin/addsalary',
        element: (
          <Suspense>
            <AdminAddSalary />
          </Suspense>
        ),
      },
      {
        path: '/admin/addproject',
        element: (
          <Suspense>
            <AdminAddProject />
          </Suspense>
        ),
      },
      {
        path: '/admin/salarydetails',
        element: (
          <Suspense>
            <AdminSalaryDetails />
          </Suspense>
        ),
      },
      {
        path: '/admin/projectdetails',
        element: (
          <Suspense>
            <AdminProjectDetails />
          </Suspense>
        ),
      },
      {
        path: '/admin/projectreport',
        element: (
          <Suspense>
            <AdminProjectReport />
          </Suspense>
        ),
      },
      {
        path: '/admin/leavereport',
        element: (
          <Suspense>
            <AdminLeaveReport />
          </Suspense>
        ),
      },
      {
        path: '/admin/addEmployee',
        element: (
          <Suspense>
            <AdminAddEmployee />
          </Suspense>
        ),
      },
      {
        path: '/admin/editProject/:projectId',
        element: (
          <Suspense>
            <AdminEditProject />
          </Suspense>
        ),
      },
      {
        path: '/Adminlogin/',
        element: (
          <Suspense>
            <AdminLogin />
          </Suspense>
        ),
      },
      {
        path: '/employeeLogin/',
        element: (
          <Suspense>
            <EmployeeLogin />
          </Suspense>
        ),
      },

      {
        path: '/employeeHomepage/',
        element: (
          <Suspense>
            <EmployeeHome />
          </Suspense>
        ),
      },
      {
        path: '/employeeSalaryDetails/',
        element: (
          <Suspense>
            <SalaryDetails />
          </Suspense>
        ),
      },
      {
        path: '/employeeProjectDetails',
        element: (
          <Suspense>
            <ProjectDetails />
          </Suspense>
        ),
      },
      {
        path: '/employeeProjectReport/',
        element: (
          <Suspense>
            <ProjectReport />
          </Suspense>
        ),
      },
      {
        path: '/employeeLeaveReport/',
        element: (
          <Suspense>
            <LeaveReport />
          </Suspense>
        ),
      },
      {
        path: '/about-hr/',
        element: (
          <Suspense>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: '/careers',
        element: (
          <Suspense>
            <Careers />
          </Suspense>
        ),
      },
      {
        path: '/contact',
        element: (
          <Suspense>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: '/policies',
        element: (
          <Suspense>
            <Policies />
          </Suspense>
        ),
      },
      {
        path: '/benefits',
        element: (
          <Suspense>
            <Benefits />
          </Suspense>
        ),
      },
      {
        path: '/training',
        element: (
          <Suspense>
            <Trainings />
          </Suspense>
        ),
      },
      {
        path: '/faq',
        element: (
          <Suspense>
            <FAQ />
          </Suspense>
        ),
      },
    ],
  },
])

function App() {
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  )
}

export default App
