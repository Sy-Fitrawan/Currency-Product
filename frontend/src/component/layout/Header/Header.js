import React, { Fragment, useState } from 'react'
import './Header.css'
import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import Backdrop from '@material-ui/core/Backdrop'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import WidgetsIcon from '@material-ui/icons/Widgets';
import BallotIcon from '@material-ui/icons/Ballot';
import { useHistory } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { logout } from '../../../actions/userAction'
import { useDispatch } from 'react-redux'

const Header = ({ user }) => {

    const [open, setOpen] = useState(false)
    const history = useHistory()
    const alert = useAlert()
    const dispatch = useDispatch()

    const options = [
        { icon: <PersonIcon />, name: "Profile", func: account },
        { icon: <BallotIcon />, name: "Product", func: product },
        { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser }
    ]

    if(user.role === "admin"){
        options.unshift({
            icon: <DashboardIcon />,
            name: "Dashboard",
            func: dashboard
        })
    }

    function dashboard() {
        history.push("/admin/dashboard")
    }
    function account() {
        history.push("/account")
    }
    function product(){
        history.push("/product")
    }
    function logoutUser() {
        dispatch(logout())
        alert.success("Logout Successfully")
    }

    return (
        <Fragment>
            <Backdrop open={open} style={{ zIndex: "10" }} />
            <SpeedDial
                ariaLabel="SpeedDial tooltip example"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                style={{ zIndex: "11" }}
                open={open}
                direction="down"
                className="speedDial"
                icon={ <WidgetsIcon /> }
            >
                {options.map((item) => (
                    <SpeedDialAction
                        key={item.name}
                        icon={item.icon} 
                        tooltipTitle={item.name}
                        onClick={item.func}
                        tooltipOpen={window.innerWidth <= 600 ? true : false}
                    />
                ))}
            </SpeedDial>
        </Fragment>
    )
}

export default Header