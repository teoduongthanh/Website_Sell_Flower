import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Base64 } from 'js-base64';
import * as UserServices from "../../services/UserService";
import { useMutationHooks } from "../../hooks/useMutationHooks";
import * as message from '../../Component/MessageComponent/Message';
import Loading from "../../Component/LoadingComponent/Loading";
import { updateUser } from "../../redux/slider/userSlide";

const ProfilesUpdate = () => {
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "userName") {
      setName(value);
    } else if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPhone") {
      setPhone(value);
    } else if (name === "userAddress") {
      setAddress(value);
    }
  };

  useEffect(() => {
    setEmail(user?.email);
    setName(user?.name);
    setPhone(user?.phone);
    setAddress(user?.address);
    setAvatar(user?.avatar);
  }, [user]);

  const handleOnChangeAvatar = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(',')[1];
        setAvatar(base64String);
      };
      reader.readAsDataURL(file);
    } else {
      setAvatar(null);
    }
  };

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    console.log("rests", rests);
    return UserServices.updateUser(id, rests, access_token);
  });

  const { data: response, isError, isSuccess } = mutation;

  const handleUpdate = (e) => {
    e.preventDefault();
    const updateData = { id: user?.id, name, email, phone, address, avatar , access_token: user?.access_token };
    mutation.mutate(updateData);
  };

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserServices.getDetaisUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  useEffect(() => {
    if (isSuccess) {
      const success = "Update dữ liệu thành công";
      handleGetDetailsUser(user?.id, user?.access_token);
      message.success(success);
    } else if (isError) {
      const error = "Update dữ liệu thất bại";
      message.error(error);
    }
  }, [isSuccess, isError]);

  return (
    <div className="my-account-wrapper mt-no-text">
      <div className="container container-default-2 custom-area">
        <div className="row">
          <div className="col-lg-12 col-custom">
            <div className="myaccount-page-wrapper">
              <div className="row">
                <div className="col-lg-12 col-md-10 col-custom">
                  <div className="tab-content" id="myaccountContent">
                    <div
                      className="tab-pane fade show active"
                      id="account-info"
                      role="tabpanel"
                    >
                      <div className="myaccount-content">
                        <h3>Account Details</h3>
                        <div className="account-details-form">
                          <form onSubmit={handleUpdate}>
                            <div className="single-input-item mb-3">
                              <label htmlFor="user-name" className="required mb-1">
                                User name
                              </label>
                              <input
                                type="text"
                                id="user-name"
                                placeholder="Display user"
                                name="userName"
                                value={name}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="single-input-item mb-3">
                              <label htmlFor="number-phone" className="required mb-1">
                                Phone
                              </label>
                              <input
                                type="text"
                                id="number-phone"
                                placeholder="Phone" 
                                name="userPhone"
                                value={phone}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="single-input-item mb-3">
                              <label htmlFor="address-user" className="required mb-1">
                                Address
                              </label>
                              <input
                                type="text"
                                id="address-user"
                                placeholder=" Address" 
                                name="userAddress"
                                value={address}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="single-input-item mb-3">
                              <label htmlFor="email" className="required mb-1">
                                Email Address
                              </label>
                              <input
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                name="userEmail"
                                value={email}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="App">
                              <div className="single-input-item mb-3">
                                <label
                                  htmlFor="avatar"
                                  className="required mb-1"
                                >
                                  Avatar
                                </label>
                                <input
                                  type="file"
                                  id="avatar"
                                  placeholder="Avatar"
                                  name="fileupload"
                                  onChange={handleOnChangeAvatar}
                                />
                              </div>
                              <div className="image-preview" id="imagePreview">
                                {avatar ? (
                                  <img src={`data:image/png;base64,${avatar}`} alt="Avatar" style={{ marginBottom: "10px" }} />
                                ) : (
                                  <span>No image</span>
                                )}
                              </div>
                            </div>
                           
                              <div className="single-input-item single-item-button">
                              <Loading isLoading={loading}>
                                <button className="btn flosun-button secondary-btn theme-color rounded-0" type="submit">
                                  Save Changes
                                </button>
                                </Loading>
                              </div>
                          </form>
                          
                          {isSuccess && <p className="success-message">Profile updated successfully!</p>}
                          {isError && <p className="error-message">Failed to update profile.</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilesUpdate;
