package com.example.backend.services;

import java.util.List;

import com.example.backend.models.User;
import com.example.backend.models.Role;

public interface UserService {
 
    User addUser(User user);
    User findUserById(Long id);
    List<User> findAllUsers();
    User updateUser(User user);
    void deleteById(Long id);
    Role addRole(Role role);
    List<Role> findAllRoles();
    void addRoleToUser(Long id, String roleName);
}
