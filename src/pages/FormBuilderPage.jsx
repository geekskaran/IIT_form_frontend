// ===================================
// 1. src/pages/FormBuilderPage.jsx
// ===================================
import React from 'react';
import FormBuilder from '../components/dashboard/FormBuilder';
import DashboardLayout from '../components/layout/DashboardLayout';

const FormBuilderPage = () => {
  return (
    <DashboardLayout>
      <FormBuilder />
    </DashboardLayout>
  );
};

export default FormBuilderPage;