package net.bitacademy.java72.util;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.google.gson.Gson;

public class ResponseFactory {
  public static ResponseEntity<String> createResponse(Object obj) {
   
    HttpHeaders headers = new HttpHeaders();
    headers.add("Content-type", "text/plain;charset=UTF-8");
   
    return new ResponseEntity<String>(  
        // ResponseEntity 객체를 만들어 클라이언트에 넘길 정보를 담아서 응답.
        new Gson().toJson(obj),  // Map객체를 넘기면 JSON 형식으로 작성된 String이 옴.
        headers,
        HttpStatus.OK); // 상태정보.
    
  }
}
