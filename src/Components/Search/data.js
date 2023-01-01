export const locationOptions = [
    { value: 'ibadan', label: 'Ibadan', rating: 'safe', option:"location", groupLabel:"Locations", checked:false},
    { value: 'lagos', label: 'Lagos', rating: 'good', option:"location" , groupLabel:"Locations", checked:false },
    { value: 'abuja', label: 'Abuja', rating: 'good', option:"location" , groupLabel:"Locations" , checked:false},
    { value: 'osogbo', label: 'Osogbo', rating: 'wild' , option:"location", groupLabel:"Locations", checked:false },
    
  ];
  export const typeOptions= [
    { value: 'land', label: 'Land', color: '#00B8D9', isFixed: true, option:"type" , groupLabel:"Type of Property" , checked:false},
    { value: 'apartment', label: 'Apartment', color: '#0052CC', option:"type",groupLabel:"Type of Property", checked:false },
   
  ];
  export const listingOptions= [
    { value: 'rent', label: 'For Rent', color: '#00B8D9', isFixed: true, option:"listing", groupLabel:"Listing Category", checked:false },
    { value: 'sale', label: 'For Sale', color: '#0052CC',  option:"listing", groupLabel:"Listing Category", checked:false  },
   
  ];
  export const roomOptions= [
    { value: '1 bedroom', label: '1 Bedroom', valueForced:"1%20bedroom", color: '#00B8D9', isFixed: true,  option:"room" , groupLabel:"No of Rooms" , checked:false },
    { value: '2 bedroom', label: '2 Bedroom',valueForced:"2%20bedroom",  color: '#00B8D9', isFixed: true ,option:"room"  ,groupLabel:"No of Rooms" , checked:false},
    { value: '3 bedroom', label: '3 Bedroom',valueForced:"3%20bedroom",  color: '#00B8D9', isFixed: true, option:"room" ,groupLabel:"No of Rooms" , checked:false },
    { value: '4 bedroom', label: '4 Bedroom or More',valueForced:"4%20bedroom",  color: '#00B8D9', isFixed: true, option:"room", groupLabel:"No of Rooms" , checked:false  },
    { value: 'mini flat', label: 'Mini Flat',valueForced:"mini%20flat",  color: '#0052CC', option:"room"  , checked:false},
   
  ];
export const groupedOptions = [
    {
      label: 'Locations',
      options: locationOptions,
    },
    {
      label: 'Type of Property',
      options: typeOptions,
    },
    
    {
      label: 'Listing Category',
      options: listingOptions,
    },
    {
      label: 'No. of Rooms',
      options: roomOptions,
    },
  ];