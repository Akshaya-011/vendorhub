import React from 'react';
import CartDrawer from './cart/CartDrawer';

// Import all 10 premium templates
import BakeryTemplate from '../templates/bakery/BakeryTemplate';
import FashionTemplate from '../templates/fashion/FashionTemplate';
import RestaurantTemplate from '../templates/restaurant/RestaurantTemplate';
import HealthcareTemplate from '../templates/healthcare/HealthcareTemplate';
import EducationTemplate from '../templates/education/EducationTemplate';
import BeautyTemplate from '../templates/beauty/BeautyTemplate';
import GroceryTemplate from '../templates/grocery/GroceryTemplate';
import PicklesTemplate from '../templates/pickles/PicklesTemplate';
import PaintsTemplate from '../templates/paints/PaintsTemplate';

// Define the rendering template map
const templateMap = {
  bakery: BakeryTemplate,
  fashion: FashionTemplate,
  restaurant: RestaurantTemplate,
  healthcare: HealthcareTemplate,
  education: EducationTemplate,
  beauty: BeautyTemplate,
  grocery: GroceryTemplate,
  pickles: PicklesTemplate,
  paints: PaintsTemplate
};

export default function WebsiteRenderer({ templateKey, vendorData = {}, products = [], themeConfig = {} }) {
  // Normalize the template key (support slug, ID or template component string name)
  const normalizedKey = String(templateKey || 'fashion')
    .toLowerCase()
    .trim()
    .replace(/-deluxe|-vogue|-pro|-omakase|-creative|-care|-academy|-luxe|-haven|-pulse|-mart|-heritage|-craze/g, '');

  // Select the component or fallback gracefully to Fashion
  const SelectedTemplateComponent = templateMap[normalizedKey] || FashionTemplate;

  return (
    <>
      <SelectedTemplateComponent
        vendorData={vendorData}
        products={products}
        themeConfig={{
          ...SelectedTemplateComponent.defaultTheme,
          ...themeConfig
        }}
      />
      
      {/* Inject Universal Cart Drawer for this active store session */}
      <CartDrawer 
        storeName={vendorData?.businessName || vendorData?.name} 
        themeConfig={themeConfig} 
      />
    </>
  );
}
