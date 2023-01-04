const ProfileDetails = (props) => {
    return (
        <>
            <h1>Mon profil</h1>
            <div className="profile-details">
                <img src="" alt=""></img>
                <ul>
                    <li>Prénom : {props.name.firstName}</li>
                    <li>Nom : {props.name.LastName}</li>
                    <li>Date de naissance : {props.birthday}</li>
                    <li>Service : {props.service}</li>
                    <li>Présentation : {props.description}</li>
                    <li>Courriel : {props.email}</li>
                </ul>
            </div>
        </>
    );
};

export default ProfileDetails;
