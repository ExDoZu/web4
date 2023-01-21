package zuev.web4.services;

import zuev.web4.beans.UserBean;

import java.util.List;

public interface UserService {

    UserBean saveUser(UserBean user);
    UserBean getUser(String username);
    List<UserBean> getAllUsers();

}
