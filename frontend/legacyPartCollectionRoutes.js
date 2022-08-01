const legacyTagToItemType = {
   'AC_Inlets': 'Ports',
   'Adapters': 'Power_Adapters',
   'Adhesive_Strips': 'Adhesives',
   'Bluetooth_Boards': 'Wireless_Boards',
   'Bumpers': 'Case_Components',
   'Card_Cages': 'Case_Components',
   'Charger_Boards': 'Boards',
   'Click_Wheels': 'Buttons',
   'Clips': 'Brackets',
   'Controllers': 'Case_Components',
   'DC-In_Boards': 'Ports',
   'Digitizers': 'Screens',
   'Displays': 'Screens',
   'Dock_Connectors': 'Cables',
   'Docks': 'Ports',
   'Earbuds': 'Accessories',
   'Flash': 'Case_Components',
   'Front_Panels': 'Screens',
   'Hard_Drive_Brackets': 'Brackets',
   'Hard_Drive_Enclosures': 'Case_Components',
   'Hard_Drive_Kits': 'Kits',
   "Hard_Drives_\\(PATA\\)": 'Hard_Drives',
   "Hard_Drives_\\(SATA\\)": 'Hard_Drives',
   'Hinges': 'Case_Components',
   'I/O_Board': 'Boards',
   'Induction_Coil': 'Charging_Coils',
   'Inverters': 'Boards',
   'LCDs': 'Screens',
   'Lenses': 'Cameras',
   'Lightning_Connector': 'Cables',
   'Logic_Boards': 'Motherboards',
   'Magnets': 'Case_Components',
   'Memory_Maxxer_Kits': 'RAM',
   'Midframe': 'Case_Components',
   'Power_Jacks': 'Ports',
   'Rubber_Feet': 'Case_Components',
   'SD_Card': 'Hard_Drives',
   'SSD_Upgrade_Kits': 'Hard_Drives',
   'SSDs': 'Hard_Drives',
   'Straps': 'Case_Components',
   'Styluses': 'Accessories',
   'Test_Cables': 'Cables',
   'Timing_Control_Boards': 'Boards',
   'USB_Boards': 'Boards',
   'Wi-Fi_Boards': 'Wireless_Boards',
   'Wireless': 'Wireless_Boards',
};

const legacyTagsWithNoItemType = [
   'Audio',
   'Bearings',
   'Belts',
   'Computers',
   'Consumables',
   'DC-to-DC_Boards',
   'Filters',
   'Gaskets',
   'iFixit_Exclusives',
   'Inspection',
   'Lasers',
   'Manuals',
   'Microsoft_ASP',
   'Modems',
   'Motors',
   'PC_Cards',
   'PCIe',
   'Propellers',
   'Pulleys',
   'Pumps',
   'Retail_Display',
   'RJ-11_Boards',
   'SD_Card_Slots',
   'Software',
   'Teardown_Case',
   'Textile_Repair',
   'Thermal_Pads',
   'Vaude',
];

function mapPartItemTypes() {
   // Redirect tags we've renamed to the new item type name
   const oldToNew = Object.entries(legacyTagToItemType).map(
      ([oldTag, itemType]) => ({
         source: `/Parts/:slug/${oldTag}`,
         destination: `/Parts/:slug/${itemType}`,
         permanent: true,
      })
   );

   // Redirect tags we don't support anymore to the base product list page.
   const legacyToParent = legacyTagsWithNoItemType.map((oldTag) => ({
      source: `/Parts/:slug/${oldTag}`,
      destination: `/Parts/:slug`,
      permanent: true,
   }));

   return [...oldToNew, ...legacyToParent];
}

module.exports = { mapPartItemTypes };
