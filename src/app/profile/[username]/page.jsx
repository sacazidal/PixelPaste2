"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Loader from "@/components/Loader";
import { fetchUrlProtected, fetchUrlUpdateData } from "@/utils/fetchUrl";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "react-toastify";

const Profile = ({ params }) => {
  const { username } = use(params);
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "********",
    avatar: "",
  });
  const [tempFormData, setTempFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "********",
    avatar: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(fetchUrlProtected, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          redirect("/");
        }
        const data = await response.json();
        setAuthUser(data.user);
        setFormData({
          firstName: data.user.first_name || "Не заполнено",
          lastName: data.user.last_name || "Не заполнено",
          email: data.user.email,
          password: "********",
          avatar: data.user.avatar,
        });
        setTempFormData({
          firstName: data.user.first_name || "Не заполнено",
          lastName: data.user.last_name || "Не заполнено",
          email: data.user.email,
          password: "********",
          avatar: data.user.avatar,
        });
      } catch (error) {
        console.error("Ошибка при получении данных пользователя:", error);
        redirect("/");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setTempAvatar(null);
    setTempFormData(formData);
    setEditMode(false);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    if (!file.type.startsWith("image/")) {
      toast.error("Пожалуйста, загрузите изображение.");
      return;
    }

    const MAX_FILE_SIZE = 5 * 1024 * 1024;
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Файл слишком большой. Максимальный размер: 5 МБ.");
      return;
    }

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMAGEBB_API_KEY}`,
        {
          method: "POST",
          mode: "cors",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.data?.url) {
        setTempAvatar(data.data.url);
        toast.success("Картинка успешно загружена!");
      } else {
        throw new Error("Ошибка при загрузке изображения на imgBB");
      }
    } catch (error) {
      console.error("Ошибка при загрузке аватара:", error);
    }
  };

  const handleSave = async () => {
    try {
      const dataToSend = {
        userId: authUser.id,
        firstName: tempFormData.firstName,
        lastName: tempFormData.lastName,
        email: tempFormData.email,
        password:
          tempFormData.password === "********"
            ? undefined
            : tempFormData.password,
        avatar: tempAvatar || tempFormData.avatar,
      };

      const updateResponse = await fetch(fetchUrlUpdateData, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!updateResponse.ok) {
        throw new Error("Ошибка при сохранении данных в базу данных");
      }

      setFormData(tempFormData);

      setTempAvatar(null);

      toast.success("Данные успешно обновлены!");
      setEditMode(false);
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при обновлении данных!");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-neutral-800 dark:to-neutral-800">
      <Header />
      <main className="flex items-center justify-center p-4">
        <div className="max-w-3xl w-full bg-white dark:bg-neutral-900 p-8 rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-3xl">
          <div className="flex flex-col items-center space-y-6">
            <div className="relative w-32 h-32 group">
              <Image
                src={tempAvatar || formData.avatar || "/UserAvatar.webp"}
                alt="Avatar"
                className="rounded-full border-4 border-white dark:border-neutral-800 shadow-lg transform transition-all duration-300 group-hover:scale-105"
                fill
                object-fit="cover"
              />
              {editMode && (
                <label className="absolute bottom-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-md hover:bg-blue-600 transition-all">
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <ImageUp />
                </label>
              )}
            </div>
            <h1 className="text-3xl font-bold dark:text-white text-neutral-800">
              {authUser.username}
            </h1>
          </div>

          {/* Поля профиля */}
          <div className="mt-8 space-y-6">
            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-neutral-700 mb-2">
                Имя
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="firstName"
                  value={tempFormData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg dark:text-white text-neutral-800">
                  {formData.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-neutral-700 mb-2">
                Фамилия
              </label>
              {editMode ? (
                <input
                  type="text"
                  name="lastName"
                  value={tempFormData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg dark:text-white text-neutral-800">
                  {formData.lastName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-neutral-700 mb-2">
                Email
              </label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={tempFormData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg dark:text-white text-neutral-800">
                  {formData.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-neutral-700 mb-2">
                Пароль
              </label>
              {editMode ? (
                <input
                  type="password"
                  name="password"
                  value={tempFormData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              ) : (
                <p className="px-4 py-3 bg-gray-50 dark:bg-neutral-800 rounded-lg dark:text-white text-neutral-800">
                  ••••••••
                </p>
              )}
            </div>
          </div>
          <div className="mt-8 flex justify-end space-x-4">
            {editMode ? (
              <>
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all transform hover:scale-105"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all transform hover:scale-105"
                >
                  Сохранить
                </button>
              </>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="px-6 py-3 bg-blue-500 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-700 transition-all transform hover:scale-105"
              >
                Редактировать
              </button>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default Profile;
