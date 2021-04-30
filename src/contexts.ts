import React from 'react'

import EbacProfile from './ebac'

export const ProfileContext = React.createContext({
    value: EbacProfile.CreateOtherProfile(88), 
    set: (props: {}) => {},
});
