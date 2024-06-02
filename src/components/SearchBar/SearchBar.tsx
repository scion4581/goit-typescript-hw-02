import { FC } from 'react';
import { GoSearch } from 'react-icons/go';
import toast from 'react-hot-toast';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import css from './SearchBar.module.css';

interface SearcBarProps {
    onSearch: (searchQuery: string) => void
}

interface FormValues {
    searchQuery: string
}

const SearchBar: FC<SearcBarProps> = ({onSearch}) => {

    const initialValues: FormValues = { searchQuery: '' };

    const onSubmit = (values: FormValues, { resetForm }: FormikHelpers<FormValues>) => {
        const searchQuery = values.searchQuery.trim();        
        if (!searchQuery) {
            toast.error('To search the images you have to enter something!');
        } else {
            onSearch(searchQuery);
            resetForm();
        }
    };

    return (
        <div className={css.searchPicturesBar}>
            <Formik initialValues={initialValues} onSubmit={onSubmit} >
                <Form className={css.searchPicturesForm}>
                    <button className={css.searchPicturesButton} type='submit'>
                        <GoSearch />
                    </button>
                    <Field
                        className={css.searchPicturesInput}
                        type="text"
                        name="searchQuery"
                        placeholder="Search images and photos"
                        autoComplete="off"
                        autoFocus
                    />
                </Form>
            </Formik>
        </div>
      );
}

export default SearchBar;