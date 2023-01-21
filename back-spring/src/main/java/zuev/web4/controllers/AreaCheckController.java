package zuev.web4.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import zuev.web4.beans.PointBean;
import zuev.web4.repositories.PointDataRepository;
import zuev.web4.security.UsernameDecoder;
import zuev.web4.services.AreaCheckService;
import zuev.web4.services.PointValidationService;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api")
public class AreaCheckController {

    private final PointDataRepository pointDataRepository;
    private final AreaCheckService areaCheckService;
    private final PointValidationService pointValidationService;

    @CrossOrigin
    @GetMapping("/points")
    public ResponseEntity<List<PointBean>> getAllPoints(HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        String author = UsernameDecoder.decodeUsername(token);
        return ResponseEntity.ok(pointDataRepository.findAllByUsername(author));
    }

    @CrossOrigin
    @PostMapping("/points/checkhit")
    public ResponseEntity<PointBean> checkPoint(@RequestBody PointBean point, HttpServletRequest request) {
        String token = request.getHeader(AUTHORIZATION);
        String author = UsernameDecoder.decodeUsername(token);
        if (pointValidationService.isValid(point)) {
            areaCheckService.check(point);
            point.setUsername(author);
            pointDataRepository.save(point);
            return ResponseEntity.ok(point);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

}
