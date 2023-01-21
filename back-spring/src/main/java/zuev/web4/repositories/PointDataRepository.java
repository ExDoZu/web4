package zuev.web4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import zuev.web4.beans.PointBean;

import java.util.List;

@Repository
public interface PointDataRepository extends JpaRepository<PointBean, Long> {

    List<PointBean> findAllByUsername(String username);

}
