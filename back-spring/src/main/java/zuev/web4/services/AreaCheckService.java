package zuev.web4.services;

import org.springframework.stereotype.Service;
import zuev.web4.beans.PointBean;

import java.util.Date;

@Service
public class AreaCheckService {

    public PointBean check(PointBean point) {
        long start = System.nanoTime();
        point.setTime(new Date());
        point.setResult(isHit(point));
        point.setExecution(String.valueOf(System.nanoTime() - start));
        return point;
    }

    private boolean isHit(PointBean point) {
        double x = point.getX();
        double y = point.getY();
        double r = point.getR();

        return isRectangle(x, y, r) || isTriangle(x, y, r) || isSector(x, y, r);
    }

    private boolean isTriangle(double x, double y, double r) {
        return (x <= 0 && y <= 0) && (y >= -x/2.0 - r/2.0);
    }

    private boolean isSector(double x, double y, double r) {
        return (x >= 0 && y <= 0) && (y * y + x * x <= r/2.0 * r/2.0);
    }

    private boolean isRectangle(double x, double y, double r) {
        return (x >= 0 && x <= r) && (y >=0 && y <= r/2.0);
    }

}
