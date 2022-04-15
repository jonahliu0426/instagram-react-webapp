import { userInfo } from "os";

const handleImageUpload = async ({ user, media, setProfileImage, editUserAvatar }) => {
    let myHeaders = new Headers();
    let filename = media['name'];
    console.log(filename)
    myHeaders.append("Content-Type", `image/${filename.slice(filename.lastIndexOf('.') + 1)}`);
    let fr = new FileReader();
    console.log(media);
    fr.readAsArrayBuffer(media);
    let file = null;
    fr.onload = function () {
        try {
            file = new Uint8Array(fr.result);
            let requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: file,
                redirect: 'follow'
            };

            fetch(`https://urmkm2ivv6.execute-api.us-east-1.amazonaws.com/dev/upload/instagram-web-app-storage/${filename}`, requestOptions)
                .then(response => {
                    console.log(response);
                    const url = `https://instagram-web-app-storage.s3.amazonaws.com/${filename}`;
                    const variables = { id: user.id, profileLink: url };
                    editUserAvatar({ variables });
                    setProfileImage(url);
                })
                // .then(data => console.log(data))
                .catch(error => console.error(error));

        } catch (error) {
            console.error('Error uploading profile image, ', error);
            return error;
        }
    }
}

export default handleImageUpload