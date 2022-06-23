import { IUser } from "./reducer/userInterface";
import SearchItem from "./SearchItem";

const SearchList = (props: { users: Array<IUser> }) => {
    const { users } = props;
    return (
        <>
            {users.map(user =>
                <SearchItem key={user.id} user={user} />
            )}
        </>
    )
}

export default SearchList