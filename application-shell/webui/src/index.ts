/*
 * Dynamically imports the boostrap file, creating an asynchronous boundary
 *
 * This allows webpack to fetch dependencies before executing the bootstrap code.
 */
import('./bootstrap');
