package ru.kata.spring.boot_security.demo.dao;

import org.springframework.stereotype.Repository;
import ru.kata.spring.boot_security.demo.model.Role;
import ru.kata.spring.boot_security.demo.model.User;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Repository
public class RoleDaoImpl implements RoleDao{

    @PersistenceContext
    private EntityManager entityManager;
    @Override
    public Role getRoleByName(String role) {
        return entityManager.createQuery("SELECT r from Role r WHERE r.name = :name", Role.class).
                setParameter("name", role).getSingleResult();
    }

    @Override
    public List<Role> getAllRoles() {
        return entityManager.createQuery("select r from Role r", Role.class).getResultList();
    }

    @Override
    public void saveRole(Role role) {
        entityManager.persist(role);
        entityManager.flush();
    }
}
