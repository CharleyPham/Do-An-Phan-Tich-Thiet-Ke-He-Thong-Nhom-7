package com.example.demo.controller;

import com.example.demo.entity.DanhMuc;
import com.example.demo.repository.DanhMucRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/api/danhmuc")
@CrossOrigin(origins = "*") // Lệnh này giúp file HTML chạy ở cổng 5500 không bị chặn khi gọi sang cổng 8080
public class DanhMucController {
    @Autowired
    private DanhMucRepository danhMucRepository;

    @GetMapping
    public List<DanhMuc> layTatCaDanhMuc() {
        // Gọi thẳng vào kho và lấy tất cả các danh mục ra
        return danhMucRepository.findAll();
    }
}
