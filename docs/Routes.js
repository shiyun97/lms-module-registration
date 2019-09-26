import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { MDBContainer, MDBCol, MDBRow, MDBJumbotron } from "mdbreact";
import { observer, inject } from 'mobx-react';

// MRS IMPORTS
import StudentLoginPage from './dev/Student/StudentLoginPage';
import UnderMaintenancePage from "./dev/UnderMaintenancePage";
import Home from "./dev/Home";
import UsersManagementPage from "./dev/Admin/UsersManagementPage";
import MyClassesPage from './dev/Student/MyClassesPage';
import SelectModulesPage from './dev/Student/SelectModulesPage';
import SelectTutorialsPage from './dev/Student/SelectTutorialsPage';
import SubmitAppealPage from './dev/Student/SubmitAppealPage';
import AllocateModulesPage from './dev/Admin/AllocateModulesPage';
import AdminLoginPage from "./dev/Admin/AdminLoginPage";
import MountModulePage from "./dev/Admin/MountModulePage";
import MountModulePageForm from "./dev/Admin/MountModulePageForm";

// COMPONENT TEMPLATES
import NavigationNavPage from "./pages/NavigationNavPage";
import FormsNavPage from "./pages/FormsNavPage";
import TablesNavPage from "./pages/TablesNavPage";
import AddonsNavPage from "./pages/AddonsNavPage";
import ModalsNavPage from "./pages/ModalsNavPage";
import AdvancedNavPage from "./pages/AdvancedNavPage";
import ComponentsNavPage from "./pages/ComponentsNavPage";
import AnimationPage from "./pages/AnimationPage";
import AlertPage from "./pages/AlertPage";
import HomePage from "./pages/HomePage";
import ButtonPage from "./pages/ButtonPage";
import CSSNavPage from "./pages/CSSNavPage";
import TablePage from "./pages/TablePage";
import TableResponsivePage from "./pages/TableResponsivePage";
import TableScrollPage from "./pages/TableScrollPage";
import TableStylesPage from "./pages/TableStylesPage";
import BadgePage from "./pages/BadgePage";
import BreadcrumbPage from "./pages/BreadcrumbPage";
import FaPage from "./pages/FaPage";
import DatatablePage from "./pages/DatatablePage";
import DatatableApiPage from "./pages/DatatableApiPage";
import ModalPage from "./pages/ModalPage";
import ModalFormPage from "./pages/ModalFormPage";
import ModalExamplesPage from "./pages/ModalExamplesPage";
import ProgressPage from "./pages/ProgressPage";
import InputPage from "./pages/InputPage";
import MediaPage from "./pages/MediaPage";
import JumbotronPage from "./pages/JumbotronPage";
import CardsPage from "./pages/CardsPage";
import PaginationPage from "./pages/PaginationPage";
import PopoverPage from "./pages/PopoverPage";
import ListGroupPage from "./pages/ListGroupPage";
import CarouselPage from "./pages/CarouselPage";
import PanelPage from "./pages/PanelPage";
import CollapsePage from "./pages/CollapsePage";
import TooltipsPage from "./pages/TooltipsPage";
import FooterPage from "./pages/FooterPage";
import MasksPage from "./pages/MasksPage";
import DropdownPage from "./pages/DropdownPage";
import VideoCarouselPage from "./pages/VideoCarouselPage";
import HoverPage from "./pages/HoverPage";
import FormsPage from "./pages/FormsPage";
import ChartsPage from "./pages/ChartsPage";
import SearchPage from "./pages/SearchPage";
import ValidationPage from "./pages/ValidationPage";
import NavbarPage from "./pages/NavbarPage";
import IframePage from "./pages/IframePage";
import EdgeHeaderPage from "./pages/EdgeHeaderPage"
import SpinnerPage from './pages/SpinnerPage';
import MasonryPage from './pages/MasonryPage';
import ScrollBarPage from './pages/ScrollBarPage';
import NavsPage from './pages/NavsPage';
import TabsPage from './pages/TabsPage';
import PillsPage from './pages/PillsPage';
import NotificationPage from './pages/NotificationPage';
import InputGroupPage from './pages/InputGroupPage'
import TreeviewPage from './pages/TreeviewPage'
import AnalyticsPage from './pages/AnalyticsPage';
import ScheduleSettingsPage from "./dev/Admin/ScheduleSettingsPage";

@inject('dataStore')
@observer
class Routes extends React.Component {

  render() {

    // print login status
    // console.log(this.props.dataStore.getSignInStatus)

    const StudentPrivateRoute = ({ path: Path, component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.dataStore.getSignInStatus === true
          ? <Component {...props} />
          :
          <>
            {this.props.dataStore.setPath(Path)}
            <Redirect to='/login' />
          </>
      )
      }
      />
    )
    const AdminPrivateRoute = ({ path: Path, component: Component, ...rest }) => (
      <Route {...rest} render={(props) => (
        this.props.dataStore.getSignInStatus === true
          ? <Component {...props} />
          :
          <>
            {this.props.dataStore.setPath(Path)}
            <Redirect to='/admin' />
          </>
      )
      }
      />
    )
    return (
      <Switch>

        <Route exact path="/home" component={HomePage} />
        <Route exact path="/" component={Home} />
        <Route exact path="/undermaintenance" component={UnderMaintenancePage} />

        {/* MODULE REGISTRATION (STUDENT) */}
        <Route exact path="/login" component={StudentLoginPage} />
        <StudentPrivateRoute exact path="/student/:studentId/classes" component={MyClassesPage} />
        <StudentPrivateRoute exact path="/student/:studentId/select-modules" component={SelectModulesPage} />
        <StudentPrivateRoute exact path="/student/:studentId/select-tutorials" component={SelectTutorialsPage} />
        <StudentPrivateRoute exact path="/student/appeals" component={SubmitAppealPage} />

        {/*  MODULE REGISTRATION (ADMIN) */}
        <Route exact path="/admin" component={AdminLoginPage} />
        <AdminPrivateRoute exact path="/admin/scheduleSettings" component={ScheduleSettingsPage} />
        <AdminPrivateRoute exact path="/admin/users" component={UsersManagementPage} />
        <AdminPrivateRoute exact path="/admin/allocate-modules" component={AllocateModulesPage} />
        <AdminPrivateRoute exact path="/admin/mountModulePage" component={MountModulePage} />
        <AdminPrivateRoute exact path="/admin/mountModulePage/form/:index" component={MountModulePageForm} />

        {/* FREE Templates */}
        <Route exact path="/analytics" component={AnalyticsPage} />
        <Route exact path="/addons" component={AddonsNavPage} />
        <Route exact path="/advanced" component={AdvancedNavPage} />
        <Route exact path="/components" component={ComponentsNavPage} />
        <Route exact path="/css" component={CSSNavPage} />
        <Route exact path="/forms" component={FormsNavPage} />
        <Route exact path="/modals" component={ModalsNavPage} />
        <Route exact path="/navigation" component={NavigationNavPage} />
        <Route exact path="/tables" component={TablesNavPage} />
        <Route path="/addons/iframe" component={IframePage} />
        <Route path="/addons/edge-header" component={EdgeHeaderPage} />
        <Route path="/addons/notifications" component={NotificationPage} />
        <Route path="/addons/treeview" component={TreeviewPage} />
        <Route path="/advanced/carousel" component={CarouselPage} />
        <Route path="/advanced/collapse" component={CollapsePage} />
        <Route path="/advanced/videocarousel" component={VideoCarouselPage} />
        <Route path="/advanced/videocarousel" component={VideoCarouselPage} />
        <Route path="/advanced/alerts" component={AlertPage} />
        <Route path="/advanced/popover" component={PopoverPage} />
        <Route path="/advanced/tooltips" component={TooltipsPage} />
        <Route path="/advanced/charts" component={ChartsPage} />
        <Route path="/advanced/scrollbar" component={ScrollBarPage} />
        <Route path="/css/animations" component={AnimationPage} />
        <Route path="/css/icons" component={FaPage} />
        <Route path="/css/jumbotron" component={JumbotronPage} />
        <Route path="/css/masks" component={MasksPage} />
        <Route path="/css/hover" component={HoverPage} />
        <Route path="/css/masonry" component={MasonryPage} />
        <Route path="/components/media" component={MediaPage} />
        <Route path="/components/badge" component={BadgePage} />
        <Route path="/components/cards" component={CardsPage} />
        <Route path="/components/buttons" component={ButtonPage} />
        <Route path="/components/dropdown" component={DropdownPage} />
        <Route path="/components/progress" component={ProgressPage} />
        <Route path="/components/pagination" component={PaginationPage} />
        <Route path="/components/list-group" component={ListGroupPage} />
        <Route path="/components/panels" component={PanelPage} />
        <Route path="/components/search" component={SearchPage} />
        <Route path="/components/spinner" component={SpinnerPage} />
        <Route path="/components/tabs" component={TabsPage} />
        <Route path="/components/pills" component={PillsPage} />
        <Route path="/forms/forms" component={FormsPage} />
        <Route path="/forms/validation" component={ValidationPage} />
        <Route path="/forms/input" component={InputPage} />
        <Route path="/forms/inputgroup" component={InputGroupPage} />
        <Route path="/modals/modal" component={ModalPage} />
        <Route path="/modals/modal-form" component={ModalFormPage} />
        <Route path="/modals/modal-examples" component={ModalExamplesPage} />
        <Route path="/navigation/navbar" component={NavbarPage} />
        <Route path="/navigation/breadcrumb" component={BreadcrumbPage} />
        <Route path="/navigation/navs" component={NavsPage} />
        <Route path="/navigation/footer" component={FooterPage} />
        <Route path="/tables/table" component={TablePage} />
        <Route path="/tables/table-responsive" component={TableResponsivePage} />
        <Route path="/tables/table-scroll" component={TableScrollPage} />
        <Route path="/tables/table-styles" component={TableStylesPage} />
        <Route path="/tables/datatable-api" component={DatatableApiPage} />
        <Route path="/tables/datatable" component={DatatablePage} />

        <Route
          render={function () {
            return (
              <MDBContainer style={{ paddingTop: 50, paddingBottom: 50 }} align="center">
                <MDBRow>
                  <MDBCol md="12" className="mt-3 mx-auto">
                    <MDBJumbotron>
                      <img src="http://kalashreeheritage.com/wp-content/uploads/2018/08/maxresdefault.jpg" width="50%" />
                    </MDBJumbotron>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
            )
          }}
        />
      </Switch >
    );
  }
}

export default Routes;
