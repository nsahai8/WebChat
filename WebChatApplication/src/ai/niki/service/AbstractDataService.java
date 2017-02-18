package ai.niki.service;

import java.io.Serializable;

public interface AbstractDataService<T,ID extends Serializable> {

    T findById(ID id);


    Iterable<T> findAll();

    T save(T t);

    Iterable<T> save(Iterable<T> ts);

    void delete(ID id);

    void delete(Iterable<T> ts);

    long count();

}

