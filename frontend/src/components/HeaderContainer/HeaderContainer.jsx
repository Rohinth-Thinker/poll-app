import './HeaderContainer.css';

function HeaderContainer() {

    return (
        <div className="header-container">
            <div className="left-section">
                <span className="left-text">
                    Welcome, Rohinth!
                </span>

                {/* <button className="upgrade-button">Upgrade</button> */}
            </div>

            <div className="participants-count-section">
                <span className="participants-count-text">
                    <b className="participants-count">  0/50 </b>
                    Participants this month ?
                </span>

                <div className="participants-count-bar"></div>
            </div>
        </div>
    )
}

export default HeaderContainer;