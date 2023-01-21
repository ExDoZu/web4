package zuev.web4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zuev.web4.beans.UserBean;

@Repository
public interface UserDataRepository extends JpaRepository<UserBean, String> {

    UserBean findByUsername(String username);

}
