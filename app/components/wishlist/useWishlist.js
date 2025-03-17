import useUserContext from "../../context/user/userProvider";

const useWishlist = () => {
    const {user} = useUserContext();

    const items = user?.wishlist?.items || [];
    const id = user?.wishlist.id || null;

    return {
        items
    }

}

export default useWishlist;