/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Components
import NavBar from './navbar.jsx';
import Footer from './footer.jsx';
import ImageSlider from './imageSlider.jsx';
import AboutUsPage from './AboutUsPage.jsx';
import History from './history.jsx';
import ScienceLabMain from './ScienceLabPage.jsx';
import MathLabMain from './MathLabPage.jsx';
import LibraryPage from './librarymain.jsx';
import ComLabMain from './ComputerLabPage.jsx';
import SmartClassPage from './smartclass.jsx';
import MidDayMealPage from './middaymeal.jsx';
import GovScholarshipPage from './GovScholarshipPage.jsx';
import SpecialDivyangPage from './divyangroom.jsx';
import TransportationPage from './transportation.jsx';
import EventMain from './eventmain.jsx';
import AdminPanel from './AdminPanel.jsx';
import AnnouncementPage from './AnnouncementPage.jsx';
import MediaGallery from './MediaGallery.jsx';
import ComputerLabPage from './ComputerLabPage.jsx';
import PlayGroundPage from './PlayGroundPag.jsx';
import NotificationBar from './NotificationBar.jsx';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';
import EventSliderMain from './eventslidermain.jsx';
import PrincipalMessage from './PrincipalMessage.jsx';
import SchoolAchievements from './SchoolAchievements.jsx';



function MainLayout() {
  return (
    <>
      <NavBar />
      <ImageSlider />
      <NotificationBar />
      <PrincipalMessage />
      <SchoolAchievements />
      <EventSliderMain />
      <Footer />
    </>
  );
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />} />
      <Route path="about" element={<AboutUsPage />} />


      <Route path="facilities/sciencelab" element={<ScienceLabMain />} />
      <Route path="facilities/computer" element={<ComputerLabPage />} />
      <Route path="facilities/library" element={<LibraryPage />} />
      <Route path="facilities/mathlab" element={<MathLabMain />} />
      <Route path="facilities/comlab" element={<ComLabMain />} />
      <Route path="facilities/smartclass" element={<SmartClassPage />} />
      <Route path="facilities/middaymeal" element={<MidDayMealPage />} />
      <Route path="facilities/scholarship" element={<GovScholarshipPage />} />
      <Route path="facilities/divyangroom" element={<SpecialDivyangPage />} />
      <Route path="facilities/playground" element={<PlayGroundPage />} />
      <Route path="facilities/transportation" element={<TransportationPage />} />
      <Route path="facilities/goverment" element={<GovScholarshipPage />} />

      <Route path="events" element={<EventMain />} />
      <Route path="admin" element={<AdminPanel />} />
      <Route path="announcements" element={<AnnouncementPage />} />
      <Route path="media" element={<MediaGallery />} />
    </>
  )
);

// 🟢 Mount App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
