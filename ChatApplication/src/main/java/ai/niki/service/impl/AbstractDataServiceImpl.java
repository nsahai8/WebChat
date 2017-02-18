package ai.niki.service.impl;

import java.io.Serializable;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Service;

import ai.niki.service.AbstractDataService;
@Service
public class AbstractDataServiceImpl<T,ID extends Serializable>  implements AbstractDataService<T,ID>{
    private PagingAndSortingRepository<T,ID> repository;

    public AbstractDataServiceImpl(PagingAndSortingRepository<T, ID> repository){
        this.repository=repository;
    }

    public T findById(ID id){
        return repository.findOne(id);
    }

    public T save(T t){
        return repository.save(t);
    }

    public Iterable<T> save(Iterable<T> ts){
        return repository.save(ts);
    }

    public void delete(ID id){
        repository.delete(id);
    }

    public void delete(Iterable<T> ts){
        repository.delete(ts);
    }

    public long count(){
        return repository.count();
    }

	public Iterable<T> findAll() {
		
		return repository.findAll();
	}

}
