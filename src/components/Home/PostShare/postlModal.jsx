
import { useState } from 'react';
import ReactPlayer from "react-player";
// import { collection } from 'firebase/firestore';
import { colPost, db, storage} from './../../../firebase';
import { useContext } from 'react';
import { AuthContext } from './../../../context/AuthContext';
import { addDoc , serverTimestamp, Timestamp  } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { updateProfile } from 'firebase/auth';
import { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import { setDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';



export default function PostalModal(props) {
    const [editorText, setEditorText] = useState("");
    const [imageFile, setImageFile] = useState("");
    const [videoFile, setVideoFile] = useState("");
    const [assetArea, setAssetArea] = useState("");
    const { currentUser } = useContext(AuthContext);

    // console.log(currentUser)

    const reset = (event) => {
        setEditorText("");
        setImageFile("");
        setVideoFile("");
        setAssetArea("");
        props.clickHandler(event);
    };

    function switchAssetArea(area) {
        setImageFile("");
        setVideoFile("");
        setAssetArea(area);
    }

    async function postArticle(event) {
        event.preventDefault();
        if (event.target !== event.currentTarget) {
            return;
        }

        // console.log(imageFile)
        
        try {
            //Create user
            const storageRef = ref(storage, currentUser.uid);
            await uploadBytesResumable(storageRef, imageFile).then(() => {
              getDownloadURL(storageRef).then(async (downloadURL) => {
                  //Update profile
                  let newImg = ""
                  if(imageFile){
                    newImg = downloadURL;
                  }
                //   console.log(downloadURL);
                //   console.log(newImg);
                  const postDetails = {
                    id:uuid(),
                    userImg: currentUser.photoURL,
                    name: currentUser.displayName,
                    uidUser: currentUser.uid,
                    description: editorText,
                    postImg: newImg,
                    createAt: serverTimestamp(),
                    likes: {
                        count: 0,
                        WhoLike: []
                    },
                    liked: false,
                }
                // addDoc(colPost , postDetails);
                setDoc(doc(db , "Posts" , postDetails.id) , postDetails )
            })
            });
          } catch (err) {
            // setErr(true);
            // setLoading(false);
          }
        
        reset(event);
    }

    // useEffect(()=>{
    //     console.log(props.showModal)
    // },[props.showModal]);

    function handleImage(event) {
		let image = event.target.files[0];

		if (image === "" || image === undefined) {
			alert(`Not an image. This file is: ${typeof imageFile}`);
			return;
		}
		setImageFile(image);
	}

    return (
        <>
            {props.showModal === "open" && (
                <div className='postModal'>
                    <div className='contant'>
                        <div className='head'>
                            <h2>Create a post</h2>
                            <button onClick={(event) => reset(event)}>
                                <img src="/images/close-icon.svg" alt="" />
                            </button>
                        </div>
                        <div className='sharedContent'>
                            <div className='UserInfo'>
                                {currentUser.photoURL ? <img src={currentUser.photoURL} alt="" /> : <img src="/images/user.svg" alt="" />}
                                <span>{currentUser.displayName}</span>
                                {/* <span>{props.user.displayName ? props.user.displayName : "Name"}</span> */}
                            </div>
                            <div className='Editor'>
                                <textarea value={editorText} onChange={(event) => setEditorText(event.target.value)} placeholder="What do you want to talk about?" autoFocus={true} />

                                {assetArea === "image" ? (
                                    <div className='UploadImage'>
                                        <input type="file" accept="image/gif, image/jpeg, image/png" name="image" id="imageFile" onChange={handleImage} style={{ display: "none" }} />
                                        <p>
                                            <label htmlFor="imageFile">Select an image to share</label>
                                        </p>
                                        {imageFile && <img src={URL.createObjectURL(imageFile)} alt="" />}
                                    </div>
                                ) : (
                                    assetArea === "video" && (
                                        <>
                                            <input
                                                type="text"
                                                name="video"
                                                id="videoFile"
                                                value={videoFile}
                                                placeholder="Enter the video link"
                                                onChange={(event) => setVideoFile(event.target.value)}
                                            />
                                            {videoFile && <ReactPlayer width={"100%"} url={videoFile} />}
                                        </>
                                    )
                                )}
                            </div>
                        </div>
                        <div className='ShareCreation'>
                            <div className='AttachAsset'>
                                <button className='AssetButton' onClick={() => switchAssetArea("image")}>
                                    <img src="/images/share-image.svg" alt="" />
                                </button>
                                <button className='AssetButton' onClick={() => switchAssetArea("video")}>
                                    <img src="/images/share-video.svg" alt="" />
                                </button>
                            </div>
                            <div className='ShareComment'>
                                <button className='AssetButton'>
                                    <img src="/images/share-comment.svg" alt="" />
                                    <span>Anyone</span>
                                </button>
                            </div>
                            <button className='PostButton' disabled={editorText|| imageFile ? false : true} onClick={(event) => postArticle(event)}>
                                Post
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// const mapStateToProps = (state) => {
// 	return {
// 		user: state.userState.user,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		postArticle: (payload) => dispatch(postArticleAPI(payload)),
// 	};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(PostalModal);
