const AvatarImage = ({ width, height, imageName }) => {
    const DEFAULT_AVATAR_NAME = 'default-avatar.jpg';

    return (
        <div className="mx-2">
            <img src={ 'https://localhost:8000/images/' + (imageName ?? DEFAULT_AVATAR_NAME) } 
                width={ width } 
                height={ height }/>
        </div>
    )
}

export default AvatarImage;