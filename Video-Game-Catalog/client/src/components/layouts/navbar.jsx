/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React from 'react';
//import the components from material tailwind
import {
    Navbar,
    MobileNav,
    Typography,
    Button,
    Menu,
    MenuHandler,
    MenuList,
    MenuItem, 
    Avatar,
    Card,
    IconButton,
} from '@material-tailwind/react';

//additional imports to display icons
import {
    CubeTransparent,
    UserCircleIcon,
    CodeBracketSquareIcon,
    Square3Stack3DIcon,
    ChevronDownIcon,
    Cog6ToothIcon,
    InboxArrowDownIcon,
    LifebuoyIcon,
    PowerIcon,
    RocketLaunchIcon,
    Bars2Icon
} from '@heroicons/react/24/solid';

//profile menu component, a togglelable feature on the header of the page
const profileMenuItems = [
    {
        label: "My Profile",  //text to be displayed after the icon
        icon: UserCircleIcon,  //this icon may need to be adjusted based on user, but for simplicity's sake, we can keep it same for now
    },
    {
        label: "Edit Profile",
        icon: Cog6ToothIcon,  //this is the settings icon
    },
    {
        label: "Inbox",
        icon: InboxArrowDownIcon,  //used to display the typical index icon
    },
    {
        label: "Help",
        icon: LifebuoyIcon
    },
    {
        label: "Sign Out",
        icon: PowerIcon,
    }
]

function profileMenu() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);  //set the togglable feature, display the content of the menu if this value is set to true --> set default value to false

    /*syntax for declaring arrow functions in jsx/js: const/var <name-of-function /> = (parameter(s)) => {
        specify function body logic here } */
    const closeMenu = () => setIsMenuOpen(false)  //use the setter and useState hook to toggle the boolean value of setIsMenuOpen

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
            {/**Specify the content to be inside menu, delete the comment if it causes rendering errors */}
            <MenuHandler>
                <Button
                    variant='text'  //specify the kind of button to be rendered on screen
                    color='blue-gray'  //color of the button to be displayed
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"  //search up the tailwindcss tags that you might be unfamiliar with
                >
                    <Avatar 
                        variant='circular'  //specify the avatar to be displayed within the button (placeholder image is a random image from online, modify as needed)
                        size='sm'
                        alt='tania andrew'
                        className='border border-gray-900 p-0.5'
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" />
                        
                    <ChevronDownIcon 
                    
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${
                            //define the logic for displaying the button content, utilizing the boolen value isMenuOpen using useState hook
                            //terniary operator based conditionals
                            isMenuOpen? "rotate-180" : ""  //if menu is open, rotate by 180 or else do nothing
                        }`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className='p-1'  //p-1 is used to represent the font-size
            >
                {profileMenuItems.map(({label, icon}, key) => {  //declare a hashamp and map the values based on the key being the label
                    return (
                        <MenuItem
                        key={label}
                        onClick={closeMenu}
                        className={`flex items-center gap-2 rounded ${
                            isLastItem  //isLastItem may cause error since it has yet to be defined (isLastItem is the signout, which we want to display as red text, hence this part of the logic)
                                ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" : ""
                        }`}
                        {
                            React.createElement(icon, {
                                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`
                            })
                        }
                        ></MenuItem>
                    )
                })}
            </MenuList>
        </Menu>
    )
}



const navbar = () => {
  return (
    <div>navbar</div>
  )
}

export default navbar